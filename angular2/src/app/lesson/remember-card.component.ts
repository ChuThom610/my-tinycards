import { Component, Input }  from '@angular/core';

import { LessonContentComponent } from './lesson-content.component';
import { LessonComponent } from './lesson.component';

@Component({
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)'
  },
  template: `
    <div class="les-wrapper">
      <div class="les-card">
        <p class="title">New Card</p>
        <div class="containerr" style="margin-bottom: 35px">
          <div class="ct-card" (click)="flipped($event)" [class.flipped]="menuOpen">
            <div class="item-card front" style="width: 100%;border-radius: 15px;overflow:auto">
              <div>
                <img src="{{data.current_card.picture.url}}" onError="this.src='./assets/images/card-demo.jpg';" style="width: 70%;margin-top: 15px;margin-bottom: 8px;">
              </div>
              <div style="overflow:auto;height: 82px;">
                <span style="word-wrap: break-word;padding-left: 5px;padding-right: 5px;"> {{data.current_card.front}} </span>
              </div>
            </div>
            <div class="item-card back" style="overflow:auto">
              <span [innerHTML]="data.current_card.back"></span>
            </div>
          </div>
        </div>
        <button type="button" id="continue-card" class="btn-continue hide" (click)="continue()">Continue <i class="fa fa-angle-double-right"></i><i class="fa fa-angle-double-right"></i><i class="fa fa-angle-double-right"></i></button>
      </div>
    </div>
  `,
  styleUrls: ['./lesson.component.css']
})
export class RememberCardComponent implements LessonContentComponent {
  @Input() data: any;
  parent: any;
  menuOpen = false;
  isFlipped = false;

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === " ") {
      event.preventDefault();
      this.flipped(event);
      return;
    }
    if (this.isFlipped && event.key === "Enter") {
      this.continue();
      return;
    }
  }

  flipped($event){
    this.menuOpen = !this.menuOpen;
    this.isFlipped = true;
    document.getElementById('continue-card').classList.remove('hide')
  }

  continue() {
    this.parent.lessonPracticeService.remembered_card(this.data.current_card);
    this.parent.nextCard();
  }
}
