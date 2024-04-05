import lang from "./js/lang.js";

const settingsBtn = document.getElementById("settingsBtn");
const settingsMenu = document.getElementById("settingsMenu");
const accuracyTxt = document.getElementById("accuracyTxt");
const valueTxt = document.getElementById("valueTxt");
const spendingTxt = document.getElementById("spendingTxt");
const langOption = document.getElementById("langOption");

let accuracy = 90
let value = 0;
let spending = 0;

const observer = new IntersectionObserver((entries) => { 
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.target.id === "accuracyTxt") {
      const setAccuracyTxt = () => { 
        accuracyTxt.innerHTML = `${accuracy < 100 ? `<span>&nbsp;${accuracy}</span>` : accuracy } %`;
        if (accuracy === 100) return;
        accuracy++;
        setTimeout(setAccuracyTxt, 150);
      }

      setAccuracyTxt();
    }
    else if (entry.isIntersecting && entry.target.id === "valueTxt") {
      const setValueTxt = () => {
        valueTxt.innerHTML = `+${value < 10 ? `0${value}` : value} %`;
        if (value === 25) return;
        value += 5;
        setTimeout(setValueTxt, 250)
      }
      setValueTxt();
    }
    else if (entry.isIntersecting && entry.target.id === "spendingTxt") {
      const setSpendingTxt = () => {
        spendingTxt.innerHTML = `${"$".repeat(spending)}<span class="txt__grey-400">${"$".repeat(5 - spending)}</span>`;
        if (spending === 3) return;
        spending++;
        setTimeout(setSpendingTxt, 500)
      }
      setSpendingTxt();
    }
  })
}); 

const formSuccessPopup = () => {
  popupS.modal({
    content: `
      <div class="form__success_modal">
        <p>Your message has been submitted, please wait for 5 - 10 business days</p>
        <input type="submit" id="popupS-button-ok" class="btn btn__primary" value="CLOSE" />
      </div>
    `,
    onClose: window.history.pushState({}, document.title, "/")
  });
}

const changeLang = (locale="es") => {
  const langObj = lang[locale];
  const navMenuList = document.querySelector(".navbar__menu__list");
  const loginBtn = document.querySelector("#loginBtn").querySelector("span");
  const section1 = document.querySelector(".main__section1");
  const section2 = document.querySelector(".main__section2");
  const section3 = document.querySelector(".main__section3");
  const section4 = document.querySelector(".main__section4");
  const section5 = document.querySelector(".main__section5");
  const footer = document.querySelector("footer");
  const copyRightTxt = document.getElementById("copyRightTxt");
  
  navMenuList.querySelectorAll("a").forEach((item, idx) => {
    item.innerText = langObj?.navbarLinks[idx];
  });
  
  loginBtn.innerText = langObj?.loginBtn;
  section1.querySelector("h1").innerText = langObj?.section1.mainHeading;
  section1.querySelector("p").innerText = langObj?.section1.tagline;
  section1.querySelector("button").querySelector("span").innerText = langObj?.section1?.demoBtn;
  
  section2.querySelector("h2").innerHTML = langObj?.section2?.mainHeading;
  section2.querySelector(".section2__content__tagline").innerText = langObj?.section2?.tagline;
  section2.querySelectorAll(".section2__col").forEach((item, idx) => {
    item.querySelector(".section2__col__tagline").innerText = langObj?.section2?.table[idx]?.tagline;
    item.querySelector(".section2__col__txt").innerText = langObj?.section2?.table[idx]?.text;
  });
  
  section3.querySelector("h2").innerHTML = langObj?.section3?.mainHeading;
  let section3ColCounter = 0;
  section3.querySelectorAll(".section3__col")?.forEach((item1) => {
    if (item1.querySelector(".section3__col__heading")) {
      item1.querySelector(".section3__col__heading").innerText = langObj?.section3?.features[section3ColCounter]?.mainHeading;
      item1.querySelector(".section3__col__tagline").innerText = langObj?.section3?.features[section3ColCounter]?.tagline;
      item1.querySelector(".section3__col__list").querySelectorAll("li").forEach((item2, idx2) => {
        item2.innerText = langObj?.section3?.features[section3ColCounter]?.list[idx2];
      });
      section3ColCounter++;
    }
  });

  section4.querySelector("h2").innerHTML = langObj?.section4?.mainHeading;
  section4.querySelector(".section4__tagline").innerText = langObj?.section4?.tagline;

  section4.querySelectorAll(".section4__col").forEach((item1, idx1) => {
    item1.querySelector("h4").innerHTML = langObj?.section4?.plans[idx1]?.mainHeading;
    item1.querySelector(".duration__tag").innerText = langObj?.section4?.plans[idx1]?.durationTxt;
    item1.querySelector(".plan__tagline").innerText = langObj?.section4?.plans[idx1]?.tagline;

    item1.querySelector(".section4__list").querySelectorAll("li")?.forEach((item2, idx2) => {
      item2.innerText = langObj?.section4?.plans[idx1]?.list[idx2];
    })

    item1.querySelector("button").innerText = langObj?.section4?.plans[idx1]?.btn;
  });

  section5.querySelector("h2").innerHTML = langObj?.section5.mainHeading;
  section5.querySelector(".section5__col__tagline").innerText = langObj?.section5.tagline;
  section5.querySelector("#designersTag").innerText = langObj?.section5.designersTag;
  section5.querySelector("#developersTag").innerText = langObj?.section5.developersTag;

  footer.querySelector(".footer__tagline").querySelector("p").innerText = langObj?.footer?.tagline;
  footer.querySelector("button").querySelector("span").innerText = langObj?.footer?.btn;
  copyRightTxt.innerHTML = langObj?.footer?.copyRightTxt;

  footer.querySelector(".footer__links").querySelectorAll("a").forEach((item, idx) => {
    item.innerText = langObj?.navbarLinks[idx];
  });
}

observer.observe(accuracyTxt);
observer.observe(valueTxt);
observer.observe(spendingTxt);

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const formSuccess = urlParams.get("form-success");
const langPref = urlParams.get("lang");
if (formSuccess === "true") formSuccessPopup();

changeLang(langPref === "es" ? "es" : "en");
langOption.innerText = langPref === "es" ? "EN" : "ES";
langOption.href = `https://plowterra.com/?lang=${ langPref === "es" ? "en" : "es" }`;

settingsBtn.addEventListener("click", () => {
  const menuStyle = settingsMenu.style;
  menuStyle.display = (menuStyle.display === "block") ? "none" : "block";
});
