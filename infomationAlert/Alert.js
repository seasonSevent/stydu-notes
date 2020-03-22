(function () {
    class Alert {
        constructor() {
            this.body = document.querySelector("body");
            this.alertBoxElement = this.createAlertBox();
            this.array = [];
            this.messageCount = 0;
            this.createStyle();
            let _this = this;
            window.addEventListener("animationend", function () {
                _this.shift(_this);
            })
        }

        createStyle() {
            let css = `
.alert-box{
    text-align: center;
    position: fixed;
    top:60px;
    left:50%;
    width:260px;
    margin-left:-130px;
}
.alert{
    opacity: 0;
    z-index: -1;
    height:30px;
    padding:5px 0;
    font-size:14px;
    text-align:center;
    line-height: 30px;
    border:1px solid transparent;
    border-radius: 5px;
    margin-bottom:10px;
}
.alert-success{
    color:#155724;
    background-color:#d4edda;
    border-color: #c3e6cb;
    animation: 2s alert forwards;
}
@keyframes alert {
    0%,100%{
        opacity: 0;
        z-index: -1;
    }
    25%,75%{
        opacity: .5;
        z-index: 999;
        transform: translateY(60px);
    }
    50%{
        opacity: 1;
    }
}
.alert-danger{
    color:#721c23;
    background-color:#f8d7da;
    border-color: #f5c6cb;
}
            `;
            let style = document.createElement("style");
            style.innerHTML = css;
            document.querySelector("head").append(style)
        }

        message(type, message) {
            this.array.push({
                type,
                message
            })
            this.array[this.messageCount].dom = this.createAlert(type, message);
            this.messageCount++;
        }

        createAlert(type, message) {
            message = message || "success";
            let alertElement = document.createElement("div");
            alertElement.classList.add("alert")
            alertElement.classList.add(`alert-${type}`)
            alertElement.innerText = message;
            this.alertBoxElement.appendChild(alertElement);
            return alertElement;
        }

        createAlertBox() {
            let alertBoxElement = document.createElement("div");
            alertBoxElement.classList.add("alert-box");
            this.body.appendChild(alertBoxElement);
            return alertBoxElement;
        }

        shift(_this) {
            _this.array[0] && _this.array[0].dom && _this.alertBoxElement.removeChild(_this.array[0].dom);
            _this.array.length && _this.array.shift();
        }
    }

    const alert = new Alert();
    window.message = function (type, message) {
        alert.message(type, message)
    }
})()