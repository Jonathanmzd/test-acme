import { Component, OnInit } from '@angular/core';
import { VehiclesService } from './vehicles.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReportExcelComponent } from 'src/app/components/report-excel/report-excel.component';
import { ProfilesService } from '../profiles/profiles.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
})
export class VehiclesComponent implements OnInit {
  listVehicles: any[] = [];
  vehicleForm: FormGroup;
  errorMessage = '';
  listDriver: any[] = [];
  listPropietario: any[] = [];

  constructor(
    private service: VehiclesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private excelService: ReportExcelComponent,
    private profileService: ProfilesService
  ) {
    this.vehicleForm = this.formBuilder.group({
      placa: ['', Validators.required],
      color: ['', Validators.required],
      marca: ['', Validators.required],
      tipo: ['', Validators.required],
      conductor_id: ['', Validators.required],
      propietario_id: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAll();
    this.getRole("Conductor");
    this.getRole("Propietario");
  }

  getAll(): void {
    this.service.getAll().subscribe({
      next: (response) => {
        this.listVehicles = Object.values(response.data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  newVehicle() {
    if (this.vehicleForm.valid) {
      this.service.createVehicle(this.vehicleForm.value).subscribe({
        next: (response) => {
          this.listVehicles = Object.values(response.data);
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

  getRole(role: string): void {
    this.profileService.getUsersByRole(role).subscribe(
      (users: any[]) => {
        if (role === 'Conductor') {
          this.listDriver = users;
        }
        if (role === 'Propietario') {
          this.listPropietario = users;
        }
      },
      (error) => {
        console.error('Error Obteniendo Datos:', error);
      }
    );
  }

  generateVehicles(): void {
    const data = this.listVehicles.map((item) => [
      item.placa,
      item.color,
      item.marca,
      item.conductor && item.conductor.profile
        ? `${item.conductor.profile.primer_nombre} ${
            item.conductor.profile.segundo_nombre
              ? item.conductor.profile.segundo_nombre + ' '
              : ''
          }${item.conductor.profile.apellidos}`
        : '-' + item.conductor.name,
        item.propietario && item.propietario.profile
        ? `${item.propietario.profile.primer_nombre} ${
            item.propietario.profile.segundo_nombre
              ? item.propietario.profile.segundo_nombre + ' '
              : ''
          }${item.propietario.profile.apellidos}`
        : '-' + item.propietario.name,
    ]);
    const headers = ['Placa', 'Color', 'Marca', 'Conductor', 'Propietario'];
    const fileName = '_report_vehicles.xlsx';

    this.excelService.generateExcel(data, headers, fileName);
  }
}
