import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Gesture, Platform, GestureController } from '@ionic/angular';

// declare var Hammer;

@Directive({
  selector: '[mwlLongPress]'
})
export class LongPressDirective implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onLongPressEvent = new EventEmitter();
  el: HTMLElement;
  pressGesture: Gesture;

  constructor(el: ElementRef, private plt: Platform, private gestureController: GestureController) {
    this.el = el.nativeElement;
    this.onLongPressEvent.emit();
  }

  ngOnInit() {
    if (this.plt.is('ios')) {
      this.pressGesture = this.gestureController.create({
        el: this.el,
        threshold: 15,
        gestureName: 'long-press-gesture',
        onMove: ev => this.onMoveHandler(ev)
      }, true);
    } else {
      this.pressGesture = this.gestureController.create({
        el: this.el,
        threshold: 15,
        gestureName: 'long-press-gesture',
        onMove: ev => this.onMoveHandler(ev)
      }, true);
      // [Hammer.Press, { time: 1000 }]
    }
  }

  onMoveHandler(ev) {
    this.onLongPressEvent.emit();
  }

  ngOnDestroy() {
    this.pressGesture.destroy();
  }
}
