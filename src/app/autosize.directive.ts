import { Directive, HostListener, ElementRef, OnInit, NgModule } from '@angular/core';

@Directive({
  selector: 'ion-textarea[autosize]'
})
export class TextAreaAutosizeDirective implements OnInit{
  @HostListener('input', ['$event.target'])
  onInput(textArea:HTMLTextAreaElement):void {
    this.adjust();
  }
  constructor(public element:ElementRef) { 
    // alert("constru")
  }
  ngOnInit():void {
    setTimeout(() => this.adjust(), 500);
  }

  adjust():void {
    let textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
    if(textArea){
      textArea.style.overflow = 'hidden';
      textArea.style.height = 'auto';
      textArea.style.height = textArea.scrollHeight + "px";
    }
    
  }
}



@NgModule({
  declarations: [
    TextAreaAutosizeDirective
  ],
  exports: [
    TextAreaAutosizeDirective
  ]
})
export class TextAreaAutosizeModule { }