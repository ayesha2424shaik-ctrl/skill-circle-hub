import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen bg-background flex items-center justify-center px-4">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
      <p className="text-muted-foreground mb-4">Page not found</p>
      <Link to="/" className="text-sm text-primary hover:underline">Go back home</Link>
    </div>
  </div>
);

export default NotFound;
