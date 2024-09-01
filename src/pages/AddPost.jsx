import React from "react";
import { PostForm as AddPostComponent } from "../components";
import { Container } from "../components";

export default function AddPost() {
  return (
    <div>
      <Container>
        <AddPostComponent />
      </Container>
    </div>
  );
}
