import { CommonModule } from "@angular/common";
import { Component, computed, inject, signal } from "@angular/core";
import { ServicePlan } from "../../model/service.plan";
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { CatalogService } from "../../services/catalog.service";

@Component({
    selector: 'catalog-component',
    standalone: true,
    imports: [CommonModule, FooterComponent, HeaderComponent],
    templateUrl: './catalog.component.html',
    styleUrl: './catalog.component.css'
})
export class CatalogComponent {
    private catalogService = inject(CatalogService);

    // Signals para manejar el estado de la aplicación.
    public loading = signal(true);
    public error = signal<string | null>(null);

    // Este signal guardará la lista de servicios ya procesada y limpia.
    private apiData = signal<ServicePlan[]>([]);

    // ¡NUEVO! Un signal "computado". Toma la data cruda y extrae solo el array de servicios.
    // La plantilla usará este `services` para el @for.
    public services = computed(() => this.apiData());

    // --- ¡NUEVO! Signals para controlar el diálogo ---
    // Este controla si el diálogo está visible o no.
    public isDialogOpen = signal(false);
    // Este guardará la información de la tarjeta en la que se hizo clic.
    public selectedService = signal<ServicePlan | null>(null);

    ngOnInit(): void {
        this.fetchData();
    }

    private fetchData(): void {
        this.loading.set(true);
        this.catalogService.getCatalogData().subscribe({
            next: (data) => {
                this.apiData.set(data);
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set(err.message);
                this.loading.set(false);
            }
        });
    }

    openDialog(service: ServicePlan): void {
        this.selectedService.set(service); // Guarda el servicio seleccionado.
        this.isDialogOpen.set(true);      // Muestra el diálogo.
    }

    // Se llama cuando cierras el diálogo (con la 'X' o haciendo clic fuera).
    closeDialog(): void {
        this.isDialogOpen.set(false);     // Oculta el diálogo.
        this.selectedService.set(null);   // Limpia la selección.
    }

    // Se llama al hacer clic en el botón "Pagar".
    handlePayment(): void {
        if (this.selectedService()) {
            //alert(`Iniciando proceso de pago para el plan ${this.selectedService()?.plan}.`);
            alert(`the action is still being built.`);
            this.closeDialog();
        }
    }

}