import { Component } from '@angular/core';
import {animate, group, keyframes, state, style, transition, trigger} from '@angular/animations';
// animations are done in transitions between two states
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        'background-color': 'blue',
        transform: 'translateX(100px)'
      })),
      transition('normal <=> highlighted', animate(450))
    ]),
    trigger('wildState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0) scale(1)'
      })),
      state('highlighted', style({
        'background-color': 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      state('shrunken', style({
        'background-color': 'green',
        transform: 'translateX(0px) scale(0.5)'
      })),
      transition('normal => highlighted', animate(450)),
      transition('highlighted => normal', animate(600)),
      transition('shrunken <=> *', [
        style({
            'background-color': 'orange'
          }),
        animate(1000, style({
          borderRadius: '50px'
        })),
        animate(500)
        ])
    ]),
    trigger('list1', [
      state('inDom', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({
          transform: 'translateX(100px)',
          opacity: 0
        }))
      ]),
    ]),
    trigger('list2', [
      state('inDom', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        animate(1000, keyframes([
          style({
            transform: 'translateX(-100px)',
            opacity: 0,
            offset: 0
          }),
          style({
            transform: 'translateX(-50px)',
            opacity: 0.5,
            offset: 0.3
          }),
          style({
            transform: 'translateX(-20px)',
            opacity: 1,
            offset:  0.8
          }),
          style({
            transform: 'translateX(0x)',
            opacity: 1,
            offset:  1
          })
        ]))
      ]),
      transition('* => void', [
        group([
          animate(150, style({
            color: 'red'
          })),
          animate(300, style({
            transform: 'translateX(100px)',
            opacity: 0
          }))
        ])
      ]),
    ]),
  ]
})
// define a style in a transition [] when there is not a starting state already defined (void)
export class AppComponent {
  state = 'normal';
  wildState = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];

  onAdd(item) {
    this.list.push(item);
  }

  onDelete(item) {
    this.list.splice(this.list.indexOf(item), 1);
  }
  onAnimate() {
    this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
    this.wildState === 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
  }

  onShrink() {
    this.wildState = 'shrunken';
  }

  // functions to kick off during lifecycle events of animations
  animationStarted(event) {
    console.log(event);
  }

  animationEnded(event) {
    console.log(event);
  }
}
