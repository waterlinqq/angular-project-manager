import { Component, OnInit, forwardRef, Input } from '@angular/core'
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormGroup,
  FormBuilder,
  FormControl,
} from '@angular/forms'
import { User } from 'src/app/domain'
import { Observable } from 'rxjs'
import { UserService } from 'src/app/service/user.service'
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  filter,
  tap,
} from 'rxjs/operators'

@Component({
  selector: 'app-chips-list',
  templateUrl: './chips-list.component.html',
  styleUrls: ['./chips-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true,
    },
  ],
})
export class ChipsListComponent implements OnInit, ControlValueAccessor {
  @Input() multiple = true
  @Input() label = '添加/修改成員'
  @Input() placeholderText = '請輸入成員email'
  form: FormGroup
  items: User[] = []
  memberResults$: Observable<User[]>
  private propagateChange = (_: any) => {}

  constructor(private fb: FormBuilder, private service: UserService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      memberSearch: [''],
    })

    this.memberResults$ = this.form.get('memberSearch').valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((s) => s && s.length >= 1),
      switchMap((str) => this.service.searchUsers(str))
    )
  }

  writeValue(obj: User[]): void {
    if (obj && this.multiple) {
      const userEntities = obj.reduce(
        (e, c) => ({
          ...e,
          c,
        }),
        {}
      )
      if (this.items) {
        const remaining = this.items.filter((item) => !userEntities[item.id])
        this.items = [...remaining, ...obj]
      }
    } else if (obj && !this.multiple) {
      this.items = [...obj]
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn
  }
  registerOnTouched(fn: any): void {}
  validate(c: FormControl): { [key: string]: any } {
    return this.items
      ? null
      : {
          chipListInvalid: true,
        }
  }
  onRemoveTagClick(member: User) {
    const idx = this.items.findIndex((item) => item.id === member.id)
    if (this.multiple) {
      this.items = [...this.items.slice(0, idx), ...this.items.slice(idx + 1)]
    } else {
      this.items = []
    }
    this.form.patchValue({ memberSearch: '' })
    this.propagateChange(this.items)
  }

  onSelectionChange(member: User) {
    if (this.items.find((user) => user.id === member.id)) {
      return
    }
    this.items = this.multiple ? [...this.items, member] : [member]
    this.form.patchValue({ memberSearch: member.name })
    this.propagateChange(this.items)
  }

  displayUser(user: User): string {
    return user ? user.name : ''
  }

  get displayInput() {
    return this.multiple || this.items.length === 0
  }
}
