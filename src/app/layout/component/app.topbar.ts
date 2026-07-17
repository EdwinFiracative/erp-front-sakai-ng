import { Component, effect, inject, output } from '@angular/core';;
import { RouterModule } from '@angular/router';
import Keycloak from 'keycloak-js';
import { KEYCLOAK_EVENT_SIGNAL, KeycloakEventType, typeEventArgs, ReadyArgs } from 'keycloak-angular';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '@/app/layout/service/layout.service';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, ButtonModule, MenuModule, AvatarModule],
    templateUrl: './templates/app.topbar.html'
})
export class AppTopbar {
    //items!: MenuItem[];
    authenticated = false;
    readonly menuToggle = output<void>();

    profileMenuItems: MenuItem[] = [];

    private readonly keycloak = inject(Keycloak);
    private readonly keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);

    layoutService = inject(LayoutService);

    constructor() {
        effect(() => {
            const keycloakEvent = this.keycloakSignal();

            if (keycloakEvent.type === KeycloakEventType.Ready) {
                this.authenticated = typeEventArgs<ReadyArgs>(keycloakEvent.args);
            }

            if (keycloakEvent.type === KeycloakEventType.AuthLogout) {
                this.authenticated = false;
            }

            this.profileMenuItems = [{ label: 'My Profile', icon: 'pi pi-user', routerLink: '/profile' }, { separator: true }, { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() }];
        });
    }

    toggleMenu() {
        this.menuToggle.emit();
    }

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({
            ...state,
            darkTheme: !state.darkTheme
        }));
    }
    login() {
        this.keycloak.login();
    }

    logout() {
        this.keycloak.logout();
    }
}
