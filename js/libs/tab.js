var $tabs = function (target) {
  var _elemTabs =
      typeof target === "string" ? document.querySelector(target) : target,
    _eventTabsShow;

  if (_elemTabs) {
    (_showTab = function (tabsLinkTarget) {
      var tabsPaneTarget, tabsLinkActive, tabsPaneShow;
      tabsPaneTarget = document.querySelector(
        tabsLinkTarget.getAttribute("href")
      );
      tabsLinkActive =
        tabsLinkTarget.parentElement.querySelector(".tabs__link_active");
      tabsPaneShow =
        tabsPaneTarget.parentElement.querySelector(".tabs__pane_show");
      if (tabsLinkTarget === tabsLinkActive) {
        return;
      }
      if (tabsLinkActive !== null) {
        tabsLinkActive.classList.remove("tabs__link_active");
      }
      if (tabsPaneShow !== null) {
        tabsPaneShow.classList.remove("tabs__pane_show");
      }
      tabsLinkTarget.classList.add("tabs__link_active");
      tabsPaneTarget.classList.add("tabs__pane_show");
      document.dispatchEvent(_eventTabsShow);
    }),
      (_switchTabTo = function (tabsLinkIndex) {
        var tabsLinks = _elemTabs.querySelectorAll(".tabs__link");
        if (tabsLinks.length > 0) {
          if (tabsLinkIndex > tabsLinks.length) {
            tabsLinkIndex = tabsLinks.length;
          } else if (tabsLinkIndex < 1) {
            tabsLinkIndex = 1;
          }
          _showTab(tabsLinks[tabsLinkIndex - 1]);
        }
      });

    _eventTabsShow = new CustomEvent("tab.show", { detail: _elemTabs });

    _elemTabs.addEventListener("click", function (e) {
      var target = e.target.closest(".tabs__link");
      if (!target) {
        return;
      }
      e.preventDefault();
      _showTab(target);
    });

    return {
      showTab: function (target) {
        _showTab(target);
      },
      switchTabTo: function (index) {
        _switchTabTo(index);
      },
    };
  }
};

$tabs(".tabs");
