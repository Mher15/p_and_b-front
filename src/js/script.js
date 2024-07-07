let pageWidth;

function removePageScroll() {
  document.body.style.overflow = "hidden";
  pageWidthAfterScrollRemov = document.body.clientWidth;

  if (pageWidthAfterScrollRemov > pageWidth) {
    document.body.style.paddingRight =
      pageWidthAfterScrollRemov - pageWidth + "px";
  } else {
    document.body.style.paddingRight = "";
  }
}

function catalogRange() {
  const rangeWrapper = document.querySelector(".filter__range-wrapper");
  const rangeItem = document.querySelector(".filter__range");

  if (rangeWrapper) {
    const range = rangeWrapper.querySelector("input");
    const firstPrice = rangeWrapper.querySelector(
      ".filter__range-result span:first-child"
    );
    const lastPrice = rangeWrapper.querySelector(
      ".filter__range-result span:last-child"
    );

    const formatForSlider = {
      from: function (formattedValue) {
        return Number(formattedValue);
      },
      to: function (numericValue) {
        return Math.round(numericValue);
      },
    };

    function formatNumber(number) {
      let numString = number.toString();

      if (numString.length > 3) {
        for (let i = numString.length - 3; i > 0; i -= 3) {
          numString = numString.slice(0, i) + " " + numString.slice(i);
        }
      }

      return numString;
    }

    noUiSlider.create(rangeItem, {
      start: [+rangeItem.dataset.startValue, +rangeItem.dataset.endValue],
      connect: true,
      format: formatForSlider,
      range: {
        min: +rangeItem.dataset.minValue,
        max: +rangeItem.dataset.maxValue,
      },
    });

    rangeItem.noUiSlider.on("update", function (values, handle, unencoded) {
      range.value = values[0] + "-" + values[1];

      if (handle == 0) {
        firstPrice.textContent = formatNumber(values[handle]) + " ₽";
      } else {
        lastPrice.textContent = formatNumber(values[handle]) + " ₽";
      }
    });
  }
}

function selects() {
  const selects = document.querySelectorAll(".components__select");

  if (selects.length != 0) {
    selects.forEach((select) => {
      const innerSelect = select.querySelector("select");

      NiceSelect.bind(innerSelect, {
        searchable: false,
        placeholder: select.dataset.selectPlaceholder,
      });

      innerSelect.addEventListener("change", () => {
        select.classList.add("changed");
      });
    });
  }
}

function filter() {
  const wrapper = document.querySelector(".catalog__section");
  const filterTrigger = document.querySelector(".catalog__filter-btn");
  const filterMenu = document.querySelector(".filter");
  const close = document.querySelector(".catalog__filter-close");

  if (wrapper) {
    filterTrigger.addEventListener("click", () => {
      if (wrapper.classList.contains("filter-open")) {
        wrapper.classList.remove("filter-open");
        filterMenu.style.maxHeight = "";
      } else {
        wrapper.classList.add("filter-open");
        filterMenu.style.maxHeight = filterMenu.scrollHeight + "px";
      }
    });

    close.addEventListener("click", () => {
      wrapper.classList.remove("filter-open");
      filterMenu.style.maxHeight = "";
    });
  }
}

function thumbSlider() {
  const thumbs = new Swiper(".product-page__thumbs", {
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    navigation: {
      prevEl: ".product-page__thumb-arrow:first-of-type",
      nextEl: ".product-page__thumb-arrow:last-of-type",
    },
    breakpoints: {
      300: {
        direction: "horizontal",
        spaceBetween: 4,
      },
      575: {
        direction: "vertical",
        spaceBetween: 12,
      },
    },
  });

  const preview = new Swiper(".product-page__previews", {
    spaceBetween: 10,
    slidesPerView: 1,
    thumbs: {
      swiper: thumbs,
    },
  });
}

function videos() {
  const videos = document.querySelectorAll("video");

  if (videos.length != 0) {
    const player = new Plyr("video");
  }
}

function priceToggler() {
  const priceElements = document.querySelectorAll(".components__count");

  if (priceElements.length == 0) {
    return;
  }

  priceElements.forEach((priceElem) => {
    const minusBtn = priceElem.querySelector(".components__count-minus");
    const plusBtn = priceElem.querySelector(".components__count-plus");

    minusBtn.addEventListener("click", function () {
      adjustPrice(-1);
    });

    plusBtn.addEventListener("click", function () {
      adjustPrice(1);
    });

    function adjustPrice(value) {
      const currentPrice = parseInt(priceElem.innerText);

      if (currentPrice + value >= 0) {
        priceElem.querySelector("span").innerText = currentPrice + value;
      }
    }
  });
}

function seasonTabs() {
  const page = document.querySelector("[data-tabs-page]");
  const tabControls = document.querySelectorAll("[data-tabs-control]");
  const tabContents = document.querySelectorAll("[data-tabs-content]");

  function followSelect() {
    const select = document.querySelector(".nice-select.tabs__select-inner");
    const items = select.querySelectorAll(".option");

    items.forEach((option, i) => {
      option.addEventListener("click", () => {
        tabContents.forEach((content, k) => {
          if (i === k) {
            content.classList.add("active");
          } else {
            content.classList.remove("active");
          }
        });

        tabControls.forEach((item, k) => {
          if (k == i) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
      });
    });
  }

  if (page) {
    tabs();
    followSelect();
  }
}

function dropdown() {
  const trigger = document.querySelector(".dropdown > button");
  const menu = document.querySelector(".dropdown__wrapper");
  const media = window.matchMedia("(max-width: 991px)");
  const menuLinks = menu.querySelectorAll(".dropdown__item");

  trigger.addEventListener("click", () => {
    if (!trigger.classList.contains("open")) {
      trigger.classList.add("open");
      menu.classList.add("open");

      if (media.matches) {
        menu.style.maxHeight = menu.scrollHeight + "px";
      }
    } else {
      trigger.classList.remove("open");
      menu.classList.remove("open");

      if (media.matches) {
        menu.style.maxHeight = "";
      }
    }
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      trigger.classList.remove("open");
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !media.matches) {
      if (trigger.classList.contains("open")) {
        trigger.classList.remove("open");
        menu.classList.remove("open");
      }
    }
  });

  document.addEventListener(
    "click",
    (e) => {
      if (
        trigger.classList.contains("open") &&
        !e.target.closest(".dropdown")
      ) {
        trigger.classList.remove("open");
        menu.classList.remove("open");
      }
    },
    {
      capture: false,
    }
  );
}

function modal() {
  const modalTriggers = document.querySelectorAll("[data-trigger-modal]");
  const modals = document.querySelectorAll("[data-modal]");
  const changeSteps = document.querySelectorAll("[data-change-step]");

  modalTriggers.forEach((trigger) => {
    const modalId = trigger.dataset.triggerModal;
    const modal = document.querySelector(`[data-modal="${modalId}"]`);

    trigger.addEventListener("click", () => {
      removePageScroll();
      modals.forEach((modal) => modal.classList.remove("open"));
      modal.classList.add("open");

      if (trigger.getAttribute("data-trigger-modal-step")) {
        const curtains = modal.querySelectorAll(".modal__curtain");

        curtains.forEach((curtain) => {
          curtain.classList.remove("active");

          if (
            trigger.getAttribute("data-trigger-modal-step") ==
            curtain.getAttribute("data-modal-step")
          ) {
            curtain.classList.add("active");
          }
        });
      }
    });
  });

  modals.forEach((modal) => {
    const cancel = modal.querySelector("[data-modal-cancel]");

    if (cancel) {
      cancel.addEventListener("click", () => {
        modals.forEach((modal) => modal.classList.remove("open"));
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      });
    }
  });

  if (changeSteps.length != 0) {
    const wrapper = document.querySelector("[data-modal='login-steps']");
    const windows = wrapper.querySelectorAll("[data-modal-step]");

    changeSteps.forEach((stepTrigger) => {
      stepTrigger.addEventListener("click", (e) => {
        const num = stepTrigger.getAttribute("data-change-step");

        windows.forEach((window) => {
          window.classList.remove("active");

          if (num === window.dataset.modalStep) {
            window.classList.add("active");
          }
        });
      });
    });
  }

  document.addEventListener(
    "click",
    (e) => {
      if (!e.target.closest("[data-modal-window]")) {
        modals.forEach((item) => {
          item.classList.remove("open");
          document.body.style.overflow = "";
          document.body.style.paddingRight = "";
        });
      }
    },
    {
      capture: true,
    }
  );

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modals.forEach((item) => {
        item.classList.remove("open");
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      });
    }
  });

  window.addEventListener("load", () => {
    modals.forEach((modal) => {
      setTimeout(() => {
        modal.style.display = "";
      }, 300);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  pageWidth = document.body.clientWidth;

  productSlider();
  togglable();
  hamburger();
  catalogRange();
  selects();
  filter();
  thumbSlider();
  videos();
  priceToggler();
  seasonTabs();
  dropdown();
  modal();
});
