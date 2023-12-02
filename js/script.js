import "../scss/style.scss";

import "./libs/fancy4.js";
import "./libs/tab.js";
import "./libs/inputmask.min.js";

// require.context("../images");

import Swiper from "swiper/bundle";

/*бургер меню*/
$(document).ready(function () {
  $(".header__burger").click(function (event) {
    $(".header__burger, .header__mob").toggleClass("active-burger");
    $("body").toggleClass("lock");
  });
  $(".header__mob-close").click(function (event) {
    $(".header__burger, .header__mob").removeClass("active-burger");
    $("body").removeClass("lock");
  });
  $(document).click(function (event) {
    if (!$(event.target).closest(".header__mob, .header__burger").length) {
      $(".header__burger, .header__mob").removeClass("active-burger");
      $("body").removeClass("lock");
    }
  });
});

//меню второго уровня в мобилке открытие
$(document).ready(function () {
  $(".main__list-item img").click(function (event) {
    $(this).parent().find(".drop__menu-box").addClass("active-drop");
  });
});

//меню второго уровня в мобилке закрытие
$(document).ready(function () {
  $(".back__btn").click(function (event) {
    $(".main__list-item img")
      .parent()
      .find(".drop__menu-box")
      .removeClass("active-drop");
  });
});

/*добавление хедеру класса при скролле*/
$(window).on("load", function () {
  var h_hght = 10;
  var height = $(window).scrollTop();

  if (height >= h_hght) {
    $("header").addClass("scroll__bg-color");
  } else {
    $("header").removeClass("scroll__bg-color");
  }

  $(window).scroll(function () {
    var height = $(window).scrollTop();
    if (height >= h_hght) {
      $("header").addClass("scroll__bg-color");
    } else {
      $("header").removeClass("scroll__bg-color");
    }
  });
});

//плавный скролл якоря
var $page = $("html, body");
$(".inner__anchor").click(function () {
  // Получаем класс целевого элемента из атрибута href ссылки
  var targetClass = $.attr(this, "href");

  // Проверяем, существует ли элемент с таким классом на странице
  if ($(targetClass).length) {
    // Выполняем анимацию скроллинга
    $page.animate(
      {
        scrollTop: $(targetClass).offset().top,
      },
      1000
    );
  }
  return false;
});

/*слйдер технологий*/
new Swiper(".technologies__sldier-container .technologies__sldier", {
  slidesPerView: 1.34,
  spaceBetween: 0,
  updateOnWindowResize: true,
  observer: true,
  observeParents: true,
  navigation: {
    nextEl: ".technologies__sldier-container .swiper-button-next",
    prevEl: ".technologies__sldier-container .swiper-button-prev",
  },
  pagination: {
    el: ".technologies__sldier-container .swiper-pagination",
    type: "fraction",
  },
  breakpoints: {
    310: {
      slidesPerView: 1.23,
    },
    480: {
      slidesPerView: 1.16,
    },
    640: {
      slidesPerView: 1.34,
    },
  },
});

/*ВИДЕО*/
$(".video").on("click", function () {
  let stubs = $(".video");
  stubs.each((i, item) => {
    if ($(item) !== $(this)) {
      $(item).next(".video__frame").remove();
    }
  });
  let src = $(this).attr("data-src");
  $(this).after(
    `<iframe class="video__frame" src="${src}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  );
});
/*слйдер видео*/
new Swiper(".video__slider-container .video__slider", {
  slidesPerView: 2.25,
  spaceBetween: 24,
  updateOnWindowResize: true,
  observer: true,
  observeParents: true,
  speed: 2000,
  autoplay: {
    delay: 4000,
  },
  breakpoints: {
    310: {
      slidesPerView: 1.16,
    },
    480: {
      slidesPerView: 1.16,
    },
    640: {
      slidesPerView: 2.25,
      spaceBetween: 24,
    },
  },
});

//слайдер компания это
new Swiper(".company__slider-container .company__slider", {
  direction: "vertical",
  slidesPerView: 1,
  spaceBetween: 0,
  updateOnWindowResize: true,
  observer: true,
  observeParents: true,
  speed: 2000,
  autoplay: {
    delay: 4000,
  },
  navigation: {
    nextEl: ".company__slider-container .swiper-button-next",
    prevEl: ".company__slider-container .swiper-button-prev",
  },
  pagination: {
    el: ".company__slider-container .swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return (
        '<span class="' +
        className +
        '">' +
        (index < 9 ? "0" : "") +
        (index + 1) +
        "</span>"
      );
    },
  },
  breakpoints: {
    310: {
      direction: "horizontal",
      slidesPerView: 1.18,
    },
    480: {
      direction: "horizontal",
      slidesPerView: 1.16,
    },
    641: {
      direction: "vertical",
      slidesPerView: 1,
      pagination: {
        el: ".company__slider-container .swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return (
            '<span class="' +
            className +
            '">' +
            (index < 9 ? "0" : "") +
            (index + 1) +
            "</span>"
          );
        },
      },
    },
  },
});

/*маска*/
let inputs = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask("+7 (999) 999-99-99");
if (im) {
  im.mask(inputs);
}

//проверка на заполнение поля для телефона
$(document).ready(function () {
  // Обработчик события input для поля #telephone
  $("#telephone").on("input", function () {
    if ($(this).val() !== "") {
      // Если поле начали заполнять, удаляем класс error
      $(this).parent().removeClass("error");
    } else {
      $(".consult__btn").removeClass("error");
    }
  });

  //код обработчика клика
  $(".consult__btn").click(function () {
    console.log("123123123");
    var phoneValue = $("#telephone").val();
    var label = $("#phoneLabel");

    if (phoneValue === "") {
      label.parent().addClass("error");
      label.text("Обязательно для заполнения");
    } else {
      label.parent().removeClass("error");
      label.text("Номер телефона");
    }
  });
});

//проверка на заполнение всех полей
$(document).ready(function () {
  // Проверка заполненности полей
  function checkInputs() {
    var allFilled = true;
    $(".input__box input").each(function () {
      var isTelInput = $(this).attr("type") === "tel";
      var value = $(this).val().replace(/\D/g, ""); // Удаление нецифровых символов

      if (isTelInput) {
        // Проверка для телефонных номеров в России
        if (value.length !== 11) {
          allFilled = false;
          return false; // Выход из цикла
        }
      } else {
        // Проверка для других полей
        if (value === "") {
          allFilled = false;
          return false; // Выход из цикла
        }
      }
    });
    return allFilled;
  }

  // Обработчик клика на кнопку
  $(".consult__btn").click(function () {
    if (checkInputs()) {
      // Если все поля заполнены
      $(this).removeClass("error");

      // Закрываем текущий Fancybox и открываем новый
      Fancybox.close();
      setTimeout(function () {
        Fancybox.show([{ src: "#successful", type: "inline" }]);
      }, 300); // Задержка в 300 мс
    } else {
      // Если не все поля заполнены
      $(this).addClass("error");
    }
  });

  // Обработчик события 'input' для проверки полей ввода
  $(".input__box input").on("input", function () {
    if (checkInputs()) {
      $(".consult__btn").removeClass("error");
    } else {
      $(".consult__btn").addClass("error");
    }
  });
});

//проверка на заполнение поля ввода для телефона в блоке контакты
$(document).ready(function () {
  // Функция для проверки заполненности поля телефона
  function checkPhoneInput() {
    var phoneValue = $("#contacts-tel").val().replace(/\D/g, ""); // Удаление нецифровых символов
    return phoneValue.length === 11;
  }

  // Функция для обновления линии заполнения
  function updateFillLine() {
    var inputVal = $("#contacts-tel").val();
    var numericInput = inputVal.replace(/\D/g, ""); // Удаляем все, кроме цифр
    var inputLength = numericInput.length;
    var maxInputLength = 11; // Максимальная длина номера телефона
    var lineWidth = (inputLength / maxInputLength) * 100; // Вычисляем процент заполнения
    lineWidth = Math.min(lineWidth, 100); // Убедимся, что линия не превышает 100%

    $(".contacts__input-line").css("width", lineWidth + "%"); // Обновляем ширину линии
  }

  // Обработчик события 'input' для поля ввода
  $("#contacts-tel").on("input", function () {
    updateFillLine(); // Обновляем линию заполнения

    // Проверка заполненности поля
    if (checkPhoneInput()) {
      $(".contacts__btn").removeClass("contacts__error");
    } else {
      $(".contacts__btn").addClass("contacts__error");
    }
  });
});

//навигация по блокам
$(document).ready(function () {
  $(".fixed-nav a").on("click", function (event) {
    $(".fixed-nav a").removeClass("fixed__active");
    $(this).addClass("fixed__active");
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });
});

//навигация по блокам добавление активного класса при скроле
$(document).ready(function () {
  $(window).on("scroll", function () {
    // Проходим по всем разделам
    $("section").each(function () {
      var top = $(window).scrollTop(); // Текущая позиция скролла
      var headerHeight = $("header").outerHeight();
      var offset = $(this).offset().top - headerHeight; // Позиция раздела
      var id = $(this).attr("id"); // ID раздела
      var height = $(this).outerHeight(); // Высота раздела

      // Проверяем, находится ли скролл внутри текущего раздела
      if (top >= offset && top < offset + height) {
        $(".fixed-nav a").removeClass("fixed__active"); // Удаляем активный класс у всех ссылок
        $('.fixed-nav a[href="#' + id + '"]').addClass("fixed__active"); // Добавляем активный класс к ссылке, соответствующей текущему разделу
      }
    });
  });
});
