import * as tslib_1 from "tslib";
import { Directive, HostListener, ElementRef, NgModule } from '@angular/core';
var TextAreaAutosizeDirective = /** @class */ (function () {
    function TextAreaAutosizeDirective(element) {
        this.element = element;
        // alert("constru")
    }
    TextAreaAutosizeDirective.prototype.onInput = function (textArea) {
        this.adjust();
    };
    TextAreaAutosizeDirective.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { return _this.adjust(); }, 500);
    };
    TextAreaAutosizeDirective.prototype.adjust = function () {
        var textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
        if (textArea) {
            textArea.style.overflow = 'hidden';
            textArea.style.height = 'auto';
            textArea.style.height = textArea.scrollHeight + "px";
        }
    };
    tslib_1.__decorate([
        HostListener('input', ['$event.target']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [HTMLTextAreaElement]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TextAreaAutosizeDirective.prototype, "onInput", null);
    TextAreaAutosizeDirective = tslib_1.__decorate([
        Directive({
            selector: 'ion-textarea[autosize]'
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], TextAreaAutosizeDirective);
    return TextAreaAutosizeDirective;
}());
export { TextAreaAutosizeDirective };
var TextAreaAutosizeModule = /** @class */ (function () {
    function TextAreaAutosizeModule() {
    }
    TextAreaAutosizeModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                TextAreaAutosizeDirective
            ],
            exports: [
                TextAreaAutosizeDirective
            ]
        })
    ], TextAreaAutosizeModule);
    return TextAreaAutosizeModule;
}());
export { TextAreaAutosizeModule };
//# sourceMappingURL=autosize.directive.js.map