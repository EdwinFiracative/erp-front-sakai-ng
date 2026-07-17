import { Component, OnInit, inject } from '@angular/core';
import Keycloak from 'keycloak-js';
import { User } from '@/models/user';

@Component({
    selector: 'app-profile',
    imports: [],
    templateUrl: './app.profile.component.html',
    styleUrl: './app.profile.component.css'
})
export class UserProfile implements OnInit {
    private readonly keycloak = inject(Keycloak);

    user: User | undefined;

    async ngOnInit() {
        if (this.keycloak?.authenticated) {
            const profile = await this.keycloak.loadUserProfile();

            this.user = {
                name: `${profile?.firstName} ${profile.lastName}`,
                email: profile?.email,
                username: profile?.username
            };
        }
    }
}
