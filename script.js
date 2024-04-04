
const accuracyTxt = document.getElementById("accuracyTxt");
const valueTxt = document.getElementById("valueTxt");
const spendingTxt = document.getElementById("spendingTxt");

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


const onClickDemo = (plan) => {
  popupS.modal({
    content: `
    <form action="https://formsubmit.co/outsafebc@gmail.com" method="POST">
      <ul class="form-style-1">
        <li><label>Full Name <span class="required">*</span></label><input type="text" name="First Name" class="field-divided" placeholder="First" required/> <input type="text" name="Last Name" class="field-divided" placeholder="Last" /></li>
        <li>
          <label>Email <span class="required">*</span></label>
          <input type="email" name="Email" class="field-long" placeholder="Email" required/>
        </li>
        <li>
          <label>Plan Type</label>
          <select name="Plan Type" class="field-select">
            <option value="Demo" ${ plan === "demo" ? "selected" : "" }>Demo</option>
            <option value="Basic" ${ plan === "basic" ? "selected" : "" }>Basic</option>
            <option value="Premium" ${ plan === "premium" ? "selected" : "" }>Premium</option>
          </select>
        </li>
        <li>
          <label>Your Message <span class="required">*</span></label>
          <textarea name="Message" id="field5" class="field-long field-textarea" required></textarea>
          <input type="hidden" name="_next" value="https://about.plowterra.com/?form-success=true">
          <input type="hidden" name="_subject" value="Plowterra Application Demo">
        </li>
        <li>
          <input type="submit" value="Submit" />
        </li>
      </ul>
    </form>`
  });
}

observer.observe(accuracyTxt);
observer.observe(valueTxt);
observer.observe(spendingTxt);

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const formSuccess = urlParams.get('form-success')
if (formSuccess === "true") formSuccessPopup();