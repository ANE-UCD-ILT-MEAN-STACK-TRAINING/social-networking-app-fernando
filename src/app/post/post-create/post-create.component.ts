import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Post } from '../post.model';
import { NgForm} from '@angular/forms';
import { PostService} from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(public postsService: PostService) {
  }

  @Output() postCreated = new EventEmitter<Post>();

//  enteredValue = '';
//  newPost = 'No Content';

  title = '';
  content = '';

  ngOnInit(): void {
  }


  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();

    /*const post: Post = {
      title: form.value.title,
      content: form.value.content
    };
    this.postCreated.emit(post);*/
  }

}
