import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import fileService from "../appwrite/fileService";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const userData = useSelector((state) => state.userData);
  // console.log("UserData in Post : ", userData);

  const isAuthor = post && userData ? post.userID === userData.$id : false;
  console.log("isAuthor in Post : ", isAuthor);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        console.log("Post in Post page:", post);
        if (post) setPost(post);
        else navigate("/");
        setLoading(false);
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        fileService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  const editPost = () => {
    navigate(`/edit-post/${post.$id}`);
  };

  const handleDeleteClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    setShowConfirmDialog(false);
    deletePost();
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full sm:w-2/3 lg:w-1/2 flex justify-center mb-4 relative  rounded-xl ">
          <img
            src={fileService.getImagePreview(post.featuredImage)}
            alt={post.title}
            className="h-auto max-w-full  rounded-lg shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
          />
        </div>

        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
        {isAuthor && (
          <div className="mt-4 mr-4 left-6 top-6">
            <Link to={`/edit-post/${post.$id}`}>
              <Button
                bgColor="bg-slate-500"
                className="mr-3"
                onClick={editPost}
              >
                Edit
              </Button>
            </Link>
            <Button bgColor="bg-slate-800" onClick={handleDeleteClick}>
              Delete
            </Button>
          </div>
        )}
        {showConfirmDialog && (
          <div className="fixed inset-0 z-50 h-full flex items-center justify-center bg-slate bg-opacity-50">
            <div className="bg-slate-400  p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
              <p className="mb-4">Are you sure you want to delete this post?</p>
              <div className="flex justify-end">
                <Button
                  bgColor="bg-slate-500"
                  className="mr-3"
                  onClick={handleCancelDelete}
                >
                  Cancel
                </Button>
                <Button bgColor="bg-red-500" onClick={handleConfirmDelete}>
                  Confirm Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  ) : loading ? (
    <Container>
      <div className="text-2xl font-bold m-4">Loading...</div>
    </Container>
  ) : null;
}
