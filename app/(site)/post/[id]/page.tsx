
import getComment from '@/lib/getComment';
import getPost from '@/lib/getPost';
import Link from 'next/link';


interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

interface PostDetailsProps {
  params: {
    id: string; 
  };
}


async function PostDetails({ params }: PostDetailsProps) {
    const { id } = await params; 
    
    const postPromise = getPost(id);
    const commentsPromise = getComment(id); 

    const [post, comments] = await Promise.all([postPromise, commentsPromise]);

    const formattedTitle = post.title.charAt(0).toUpperCase() + post.title.slice(1);
    const formattedBody = post.body.charAt(0).toUpperCase() + post.body.slice(1);
    
    return ( 
        <div className="container mx-auto px-4 py-12 mt-16 md:mt-20">
            <div className="bg-white shadow-2xl rounded-xl p-8 md:p-12 max-w-5xl mx-auto">

                <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-6 leading-tight border-b pb-4">
                    {formattedTitle}
                </h1>
                
                <div className="flex items-center text-sm text-gray-500 mb-8 pb-4 border-b border-gray-100">
                    <span className="font-semibold text-gray-700 mr-4">Post ID: {post.id}</span>
                    <span>User ID: {post.userId}</span>
                </div>
                
                <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line mb-12">
                    {formattedBody}
                </p>
                
                
                <div className="mt-10 pt-6 border-t border-gray-200">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        Comments ({comments.length})
                    </h2>

                    {comments.map((comment: Comment) => (
                        <div key={comment.id} className="bg-gray-50 p-5 rounded-lg mb-4 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <p className="font-semibold text-indigo-600">
                                    {comment.name.charAt(0).toUpperCase() + comment.name.slice(1)}
                                </p>
                                <p className="text-xs text-gray-500">{comment.email}</p>
                            </div>
                            <p className="text-gray-700 text-base leading-snug">
                                {comment.body.charAt(0).toUpperCase() + comment.body.slice(1)}
                            </p>
                        </div>
                    ))}
                </div>
                
                
                <div className="mt-10 pt-6 border-t border-gray-100 text-center">
                    <Link href="/post" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition duration-200 p-2 rounded-md hover:bg-indigo-50">
                        <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        সকল পোস্টে ফিরে যান
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default PostDetails;