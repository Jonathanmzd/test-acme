import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProfilesService } from './profiles.service';
import { ReportExcelComponent } from '../../components/report-excel/report-excel.component';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css'],
})
export class ProfilesComponent {
  listProfiles: any[] = [];
  profileForm: FormGroup;
  errorMessage = '';
  selectedUserId: string | null = null;

  constructor(
    private service: ProfilesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private excelService: ReportExcelComponent,
  ) {
    this.profileForm = this.formBuilder.group({
      cedula: ['', Validators.required],
      primer_nombre: ['', Validators.required],
      segundo_nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.max(11)]],
      ciudad: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.service.getAll().subscribe({
      next: (response) => {
        this.listProfiles = Object.values(response.data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSelectUser(id: string): void {
    this.selectedUserId = id;
  }

  newProfile(): void {
    if (this.profileForm.valid && this.selectedUserId) {
      this.profileForm.patchValue({ user_id: this.selectedUserId });
      this.service.newProfile(this.profileForm.value).subscribe({
        next: (response) => {
          this.listProfiles = Object.values(response.data);
          this.toastr.success(response.message);
          this.getAll();
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }

  generateProfiles(): void {
    const data = this.listProfiles.map(item => [
      item.email,
      item.cedula,
      item.primer_nombre,
      item.segundo_nombre,
      item.apellidos,
      item.direccion,
      item.telefono,
      item.ciudad
    ]);
    const headers = [
      'Email',
      'Cedula',
      'Primer Nombre',
      'Segundo Nombre',
      'Apellidos',
      'Direccion',
      'Telefono',
      'Ciudad'
    ];
    const fileName = '_report_profiles.xlsx';

    this.excelService.generateExcel(data, headers, fileName);
  }
}
