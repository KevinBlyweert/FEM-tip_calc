const app = {
    amount: document.querySelector(".amount"),
    customTip: document.querySelector(".customTip"),
    people: document.querySelector(".people"),
    validations: {
        amount: (value) => value > 0,
        customTip: (value) => value >= 0,
        people: (value) => value > 0,
    },
    dataIsValid: (key, value, validator) => {
        if (!validator[key]) return true
        return validator[key](value)
    },
    closeCustom: () => {
        document.querySelector(".customTip").classList.add("hidden")
        document.querySelector(".customTip").value = ""
        document.querySelector(".customBtn").classList.remove("hidden")
    },
    openCustom: () => {
        document.querySelector(".customTip").classList.remove("hidden")
        document.querySelector(".customBtn").classList.add("hidden")
    },
    desactiveTipBtn: () => {
        document.querySelectorAll(".tipBtn").forEach(element => {
            element.classList.remove("activeBtn")
        });
    },
    activeBtn: (e) => {
        app.desactiveTipBtn()
        e.classList.add("activeBtn")
    },
    handleInput: (e) => {
        if (!app.checkData(e.target)) {
            e.target.offsetParent.querySelector(".errorInput").textContent = "An error occured here";
            document.querySelector(".tipPerPerson").textContent = "$0.00"
            document.querySelector(".totalPerPerson").textContent = "$0.00"
        }
        else {
            e.target.offsetParent.querySelector(".errorInput").textContent = "";
            app.calculateTotal()
        }
    },
    checkData: (element) => {
        return app.dataIsValid(element.dataset.name, element.value, app.validations)
    },
    calculateTotal: () => {
        const dataToCheck = {
            amount: app.amount.value,
            customTip: document.querySelector(".activeBtn") ? document.querySelector(".activeBtn").dataset.tip : app.customTip.value,
            people: app.people.value,
        }
        for (const key in dataToCheck) {
            if (!app.dataIsValid(key, dataToCheck[key], app.validations))
                return false
        }
        const billPerPerson = dataToCheck.amount / dataToCheck.people
        const tip = (billPerPerson * dataToCheck.customTip) / 100
        const tippedBillPerPerson = billPerPerson + tip
        document.querySelector(".tipPerPerson").textContent = "$" + tip.toFixed(2)
        document.querySelector(".totalPerPerson").textContent = "$" + tippedBillPerPerson.toFixed(2)
    },
    init: () => {
        document.querySelector(".customBtn").addEventListener("click", () => {
            app.desactiveTipBtn()
            app.openCustom()
        })
        document.querySelectorAll(".tipBtn").forEach(element => {
            element.addEventListener("click", (e) => {
                app.activeBtn(e.target)
                app.closeCustom()
                app.calculateTotal()
            })
        });
        document.querySelectorAll(".amount,.people,.customTip").forEach(element => {
            element.addEventListener("input", app.handleInput)
        })
    }
}

document.addEventListener("DOMContentLoaded", app.init);