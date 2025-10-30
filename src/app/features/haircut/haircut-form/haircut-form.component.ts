import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { GalleriaModule } from 'primeng/galleria';

import { ErroComponent } from '../../../shared/components/erro/erro.component';
import { notZeroValidator } from '../../../shared/validators/not-zero.validator';
import { notNegativeValidator } from '../../../shared/validators/not-negative.validator';
import { ToastrService } from '../../../core/services/toastr.service';
import { HaircutService } from '../../../core/services/haircut.service';
import { HaircutImageService } from '../../../core/services/haircut-image.service';
import { HaircutDTO } from '../../../shared/models/haircut.dto';
import { operationMessages } from '../../../core/constants/operation-messages.constants';
import { DatePickerModule } from 'primeng/datepicker';
import { HaircutImageDTO } from '../../../shared/models/haircut-image.dto';
import { BaseImageDTO } from '../../../shared/models/base/base-image.dto';
import { converter } from '../../../shared/utils/image-converter.util';

@Component({
  selector: 'app-haircut-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    FloatLabel,
    TextareaModule,
    ErroComponent,
    InputNumberModule,
    FileUploadModule,
    GalleriaModule,
    DatePickerModule,
  ],
  templateUrl: './haircut-form.component.html',
  styleUrl: './haircut-form.component.scss',
})
export class HaircutFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly toastr = inject(ToastrService);
  private readonly haircutService = inject(HaircutService);
  private readonly haircutImageService = inject(HaircutImageService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly operationMessages = operationMessages;

  title: string = '';
  form!: FormGroup;
  haircutSelected!: HaircutDTO;
  id!: string;
  isUpdate = false;

  images = signal<BaseImageDTO[]>([]);
  activeIndex = signal(0);

  responsiveOptions = [
    { breakpoint: '1300px', numVisible: 4 },
    { breakpoint: '575px', numVisible: 1 },
  ];

  get imagesArray(): any[] {
    return this.images();
  }

  ngOnInit(): void {
    this.initForm();
    this.checkIfUpdate();
  }

  /** ---------------- FORM ---------------- */
  private initForm(): void {
    this.form = this.fb.group({
      id: [''],
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(3),
        ],
      ],
      time: [null, [notZeroValidator(), notNegativeValidator()]],
      price: [null, [notZeroValidator(), notNegativeValidator()]],
      description: ['', [Validators.maxLength(255), Validators.minLength(10)]],
      images: this.fb.array([]),
      createdDate: [{ value: '', disabled: true }],
      lastModifiedDate: [{ value: '', disabled: true }],
      activeImage: [''],
    });
  }

  /** ---------------- ACTIONS ---------------- */

  setActiveImage(item: HaircutImageDTO): void {
    this.images.update((imgs) =>
      imgs.map((img) => ({ ...img, active: img.filename === item.filename }))
    );
    this.form.patchValue({ activeImage: item.filename });
    this.activateImage(item.id);
  }

  removeImage(item: HaircutImageDTO): void {
    if (item.active) {
      this.toastr.showWarn(
        this.operationMessages.ERRO,
        'Não é possível excluir a imagem ativa.'
      );
      return;
    }

    this.haircutImageService.remove(item.id).subscribe({
      next: () => {
        this.images.update((imgs) => {
          const filtered = imgs.filter((img) => img?.id !== item?.id);

          const hadActiveRemoved = imgs.find(
            (img) => img.id === item.id
          )?.active;
          if (hadActiveRemoved && filtered.length > 0) {
            filtered[0] = { ...filtered[0], active: true };
          }

          this.activeIndex.set(filtered.findIndex((x) => x.active));
          return filtered;
        });
        this.toastr.showSucess(
          this.operationMessages.SUCCESS,
          'Imagem removida.'
        );
      },
      error: (err) =>
        this.toastr.showErro(this.operationMessages.ERRO, err.error?.message),
    });
  }

  onFileSelected(event: FileSelectEvent): void {
    const file = event.currentFiles[0];
    const haircutId = this.form.get('id')?.value;

    if (!file || !haircutId) return;

    this.haircutImageService.uploadImage(haircutId, file, false).subscribe({
      next: (resp: HaircutImageDTO) => {
        const newImage: BaseImageDTO = this.initImage(resp);

        this.images.update((imgs) => [...imgs, newImage]);
        if (newImage.active)
          this.form.patchValue({ activeImage: newImage.filename });

        this.toastr.showSucess(
          this.operationMessages.SUCCESS,
          'Imagem enviada.'
        );
      },
      error: (err) =>
        this.toastr.showErro(this.operationMessages.ERRO, err.error?.message),
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.toastr.showWarn(
        'Formulário inválido',
        'Reveja os dados informados.'
      );
      return;
    }

    const dto = this.form.value;
    this.isUpdate ? this.update(this.id, dto) : this.add(dto);
  }

  /** ---------------- SERVICE CALLS ---------------- */

  private initImage(image: HaircutImageDTO): BaseImageDTO {
    return {
      id: image.id,
      filename: image.filename,
      title: image.filename,
      contentType: image.contentType,
      itemImageSrc: `data:${image.contentType};base64,${image.data}`,
      thumbnailImageSrc: `data:${image.contentType};base64,${image.data}`,
      active: image.active,
    };
  }

  private activateImage(id: string): void {
    this.haircutImageService.activateImage(id).subscribe({
      next: () =>
        this.toastr.showSucess(
          this.operationMessages.SUCCESS,
          'A imagem foi definida como ativa.'
        ),
      error: (err) =>
        this.toastr.showErro(this.operationMessages.ERRO, err.error?.message),
    });
  }

  private findById(id: string): void {
    this.haircutService.findById(id).subscribe({
      next: (resp) => {
        this.haircutSelected = resp;
        this.form.patchValue(resp);
        this.loadImages(resp.images);
        this.isUpdate = true;
      },
      error: (err) =>
        this.toastr.showErro(this.operationMessages.ERRO, err.error?.message),
    });
  }

  private loadImages(images: HaircutImageDTO[]): void {
    const mapped = converter<HaircutImageDTO>(images);

    this.images.set(mapped);

    const active = mapped.find((img) => img.active);
    if (active) this.form.patchValue({ activeImage: active.filename });
  }

  private add(dto: HaircutDTO): void {
    this.haircutService.add(dto).subscribe({
      next: (resp) => {
        this.toastr.showSucess(this.operationMessages.SUCCESS, 'Corte criado.');
        this.router.navigate(['haircut', 'form', resp.id]);
      },
      error: (err) =>
        this.toastr.showErro(this.operationMessages.ERRO, err.error?.message),
    });
  }

  private update(id: string, dto: HaircutDTO): void {
    this.haircutService.update(id, dto).subscribe({
      next: () =>
        this.toastr.showSucess(
          this.operationMessages.SUCCESS,
          'Corte atualizado.'
        ),
      error: (err) =>
        this.toastr.showErro(this.operationMessages.ERRO, err.error?.message),
    });
  }

  /** ---------------- UTIL ---------------- */

  private checkIfUpdate(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.title = this.id ? 'Atualizar Corte' : 'Cadastrar Corte';
    this.id ? this.findById(this.id) : this.form.reset();
  }
}
