import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ErroComponent } from '../../../shared/components/erro/erro.component';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { BarberService } from '../../../core/services/barber.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BarberDTO } from '../../../shared/models/barber.dto';
import { ToastrService } from '../../../core/services/toastr.service';
import { KeycloakClientService } from '../../../core/services/keycloak-client.service';
import { KeycloakUserDTO } from '../../../shared/models/keycloak-user.dto';
import { operationMessages } from '../../../core/constants/operation-messages.constants';
import { HttpErrorResponse } from '@angular/common/http';
import { SpecialtyDTO } from '../../../shared/models/specialty.dto';

@Component({
  selector: 'app-barber-form',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    FloatLabel,
    ErroComponent,
    CardModule,
    SelectModule,
    TextareaModule,
    ButtonGroupModule,
  ],
  templateUrl: './barber-form.component.html',
  styleUrl: './barber-form.component.scss',
})
export class BarberFormComponent implements OnInit {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly barberService: BarberService = inject(BarberService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toastrService = inject(ToastrService);
  private readonly keycloakClientService: KeycloakClientService = inject(
    KeycloakClientService
  );
  private readonly operationMessages = operationMessages;

  form: FormGroup;
  title: string = '';
  users: KeycloakUserDTO[] = [];
  roleGroupName: string = 'BARBER';
  id: string;
  barberSelected: BarberDTO;
  isUpdate: boolean = false;

  get specialties(): FormArray {
    return this.form.get('specialties') as FormArray;
  }

  ngOnInit(): void {
    this.initForm();
    this.checkIfUpdate();
    this.getUsersByGroup();
  }

  private findById(id: string): void {
    this.barberService.findById(id).subscribe({
      next: (resp) => {
        this.barberSelected = resp;
        this.form.patchValue({
          name: resp.name,
          userId: resp.userId,
        });

        this.setSpecialties(resp.specialties);
        this.isUpdate = true;
      },
      error: (err) =>
        this.toastrService.showErro(
          this.operationMessages.ERRO,
          err.error?.message
        ),
    });
  }

  private setSpecialties(specialties: SpecialtyDTO[]) {
    const fa = this.form.get('specialties') as FormArray;
    fa.clear();

    for (const s of specialties) {
      fa.push(
        this.fb.group({
          name: [s.name],
          description: [s.description],
        })
      );
    }
  }

  private getUsersByGroup() {
    this.keycloakClientService.getUsersByGroup(this.roleGroupName).subscribe({
      next: (resp: KeycloakUserDTO[]) => {
        this.users = resp;
      },
    });
  }

  addSpecialty() {
    this.specialties.push(this.initSpecialty());
  }

  removeSpecialty(index: number) {
    this.specialties.removeAt(index);
  }

  private add(dto: BarberDTO) {
    this.barberService.add(dto).subscribe({
      next: () => {
        this.toastrService.showSucess(
          this.operationMessages.SUCCESS,
          'Barberiro adicionado com sucesso.'
        );
      },
      error: (err: HttpErrorResponse) => {
        this.toastrService.showErro(
          this.operationMessages.ERRO,
          err.error.message
        );
      },
    });
  }

  private update(id: string, dto: BarberDTO) {
    this.barberService.update(id, dto).subscribe({
      next: () => {
        this.toastrService.showSucess(
          this.operationMessages.SUCCESS,
          'Barberiro atualizado com sucesso.'
        );
      },
      error: (err: HttpErrorResponse) => {
        this.toastrService.showErro(
          this.operationMessages.ERRO,
          err.error.message
        );
      },
    });
  }

  save() {
    if (this.form.invalid) {
      this.toastrService.showWarn(
        'Formulário inválido',
        'Reveja os dados informados.'
      );
      return;
    }

    const dto = this.form.value;
    this.id ? this.update(this.id, dto) : this.add(dto);
     this.router.navigate(['barber', 'list']);
  }

  private checkIfUpdate(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.title = this.id ? 'Atualizar Barbeiro' : 'Cadastrar Barbeiro';

    if (this.id) {
      this.findById(this.id);
    } else {
      this.form.reset();
      this.addSpecialty();
    }
  }
  private initForm() {
    this.form = this.fb.group({
      id: [],
      name: [null, [Validators.required]],
      userId: [],
      specialties: this.fb.array([]),
    });
  }

  private initSpecialty() {
    return this.fb.group({
      id: [],
      name: [null, [Validators.required]],
      description: [],
    });
  }
}
