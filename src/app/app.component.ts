import {Component, OnInit} from "@angular/core";

@Component({
    selector: "app",
    templateUrl: "./app/app.html"
})
export class AppComponent implements OnInit {
    ngOnInit() {
    }

    showMainMenu = false;
    leftValue = '130px';
    styleExp = {
        'display': 'inline-block',
        'position': 'fixed',
        'background-color': '#F9F9F9',
        'height': '100% !important',
        'width': '100% !important',
        'left': '50px'
    }
    showPrimaryaryNav = true;
    showSecondaryNav = false;

    showNavBtn = true;

    showMainMenuFunc(): void {
        this.showMainMenu = !this.showMainMenu;
        if (this.showMainMenu) {
            this.styleExp = {
                'display': 'inline-block',
                'position': 'fixed',
                'background-color': '#F9F9F9',
                'height': '100% !important',
                'width': '100% !important',
                'left': '130px'
            }
            this.showPrimaryaryNav = false;
            this.showSecondaryNav = true;
            //document.getElementById('.top-form-style').style.marginRight = "135px";
        } else {
            this.styleExp = {
                'display': 'inline-block',
                'position': 'fixed',
                'background-color': '#F9F9F9',
                'height': '100% !important',
                'width': '100% !important',
                'left': '50px'
            }
            //document.getElementById('.top-form-style').style.marginRight = "65px";
            this.showPrimaryaryNav = true;
            this.showSecondaryNav = false;
        }
    }

    //隐藏2级导航点击按钮
    hideSecBtn():void{
        this.showNavBtn = false;
    }
    showSecBtn():void{
        this.showNavBtn = true;
    }


}