import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription, Subject } from 'rxjs';
import { BuilderService } from '../../core/services/builder/builder.service';
import { FileService } from '../../core/services/file/file.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'subscriptions-transport-ws';
import { IFileRawType } from '../../core/api-introspection';
import { switchMap } from 'rxjs/operators';
import { MonacoFile } from 'ngx-monaco';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  file: string;
  path: string;
  subscription: Subscription;
  form = this.formBuilder.group({
    namespace: ['', Validators.required],
    commit: ['', Validators.required]
  });
  defaultFileType: string = 'typescript';
  rawFile: Observable<IFileRawType>;
  fileMonaco: MonacoFile = {
    uri: 'index.js',
    language: this.defaultFileType,
    content: `console.log('hello world');`
  };
  loading: boolean = true;
  newFile: string;
  extension: string;
  fileChange = new Subject<MonacoFile>();

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private buildService: BuilderService,
    private formBuilder: FormBuilder,
    private fileService: FileService
  ) { }

  ngOnInit() {
    
    this.file = this.route.snapshot.paramMap.get('file');
    this.extension = this.file.split('.').pop();
    if(this.extension === 'json') {
      this.defaultFileType = 'json';
    }
    this.subscription = this.route.queryParams
      .subscribe(params => {
        this.path = params['path'];
        this.fileService.readFile(this.path)
          .subscribe(stream => {
            this.fileMonaco.content = stream.file;
            this.loading = false;
          });
        return this.rawFile;
      });

  }

  onFileChange(file: MonacoFile) {
    this.newFile = file.content;
    this.fileService.saveFile(this.path, file.content).subscribe(stream => console.log('Content saved'));
  }

  save() {

  }

  back() {
    this.location.back();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  isJsOrTs() {
    const extension = this.file.split('.').pop();
    return extension === 'js' || extension === 'ts';
  }

  deploy() {
    this.form.updateValueAndValidity();
    this.form.markAsTouched();
    if (this.form.invalid) {
      return;
    }
    const folder = this.path.replace(this.file, '');
    this.buildService.build(folder, this.file, this.form.value.commit, this.form.value.namespace, `${folder}build`)
      .subscribe(stream => {
        console.log(stream);
      });
  }

  build() {

  }

}
