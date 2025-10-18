import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Necesario para ngModel
import { AuthService } from '../../services/auth.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, FooterComponent, HeaderComponent, CommonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    private authService = inject(AuthService);
    email = signal('');
    password = signal('');

    loading = signal(false);
    error = signal<string>('');

    async onSubmit(): Promise<void> {
        this.loading.set(true);
        const success = await this.authService.login(this.email(), this.password());

        this.loading.set(false);

        if (!success) {
            this.error.set('Credenciales inválidas, Inténtalo de nuevo.');
        }

    }
}
