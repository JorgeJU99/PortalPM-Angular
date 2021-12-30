import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  autor = 'Jorge Enrique Jarrin';
  materia = 'Programación Móvil';
  copyright = '© 2021 Copyright';

  constructor() {}

  ngOnInit(): void {}
}
