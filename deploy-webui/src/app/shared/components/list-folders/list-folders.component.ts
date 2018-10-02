import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FileService } from '../../../core/services/file/file.service';
import { IFileType, IFolderStructureType } from '../../../core/api-introspection';
import { switchMap, filter } from 'rxjs/operators/index';
import { skip } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-folders',
  templateUrl: './list-folders.component.html',
  styleUrls: ['./list-folders.component.css']
})
export class ListFoldersComponent implements OnInit {
  
  private directory: string;

  constructor(
    private fileService: FileService,
    private router: Router
  ) { }

  folders: Observable<IFileType>;

  ngOnInit() {
    this.folders = this.listFiles();
    this.fileService.currentFolder
    .pipe(
      filter(d => !!d),
      switchMap(directory => {
        this.directory = directory;
        this.folders = this.listFiles();
        return this.folders;
      }),
    )
    .subscribe(() => console.log('Success'))
  }


  listFiles() {
    return this.fileService.listFiles(this.directory);
  }

  isFileFromCurrentDirectory(file: IFolderStructureType) {
    if (this.directory + '/' + file.name === file.path) {
      return true;
    }
  }

  goToFileDetails(path: string) {
    this.fileService.changeFolder(path);
  }

  back() {
    this.fileService.back();
  }

  ngOnDestroy() {
    // this.fileService.default();
  }

  openFile(file: IFolderStructureType) {
    this.router.navigate([`/folders/details/${file.name}`], { queryParams: {
      path: file.path
    }});
  }

}
