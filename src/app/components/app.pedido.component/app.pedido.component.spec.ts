import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPedidoComponent } from './app.pedido.component';

describe('AppPedidoComponent', () => {
    let component: AppPedidoComponent;
    let fixture: ComponentFixture<AppPedidoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppPedidoComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(AppPedidoComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
