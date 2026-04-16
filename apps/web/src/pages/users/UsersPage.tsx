export function UsersPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
      </div>

      <div role="alert" className="alert alert-info">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
        </svg>
        <div>
          <p className="font-semibold">Managed via auth API</p>
          <p className="text-sm">
            User management is handled through the REST auth endpoints (<code>/auth/register</code>,{' '}
            <code>/auth/login</code>) and is not exposed via GraphQL. A dedicated user management
            interface requires a <code>users</code> query to be added to the GraphQL schema.
          </p>
        </div>
      </div>
    </div>
  );
}
