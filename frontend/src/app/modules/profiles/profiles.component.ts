import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProfilesService } from './profiles.service';
import { ReportExcelComponent } from '../../components/report-excel/report-excel.component';

import { Profile } from '../../interfaces/profile.interface';
import { ProfilesResponse } from '../../interfaces/profile.interface';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css'],
})
export class ProfilesComponent implements OnInit {
  listProfiles: Profile[] = [];
  profileForm: FormGroup;
  errorMessage = '';
  selectedUserId: number = 0;

  constructor(
    private service: ProfilesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private excelService: ReportExcelComponent,
  ) {
    this.profileForm = this.formBuilder.group({
      user_id: [],
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
      next: (response: ProfilesResponse) => {
        this.listProfiles = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSelectUser(id: string): void {
    this.selectedUserId = parseInt(id, 10);
  }

  newProfile(): void {
    if (this.profileForm.valid && this.selectedUserId) {
      this.profileForm.patchValue({ user_id: this.selectedUserId });
      this.service.newProfile(this.profileForm.value).subscribe({
        next: (response) => {
          this.listProfiles = Object.values(response.data);
          this.toastr.success(response.message);
          this.getAll();
          this.clearProfileForm();
          this.selectedUserId = 0;
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }

  clearProfileForm() {
    this.profileForm.reset();
  }

  generateProfiles(): void {
    const data = this.listProfiles.map((item: Profile) => [
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
