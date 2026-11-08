// Login and signup: the admin look, without the sidebar. admin-shell turns on the admin theme.
export default function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  return <main className="admin-shell flex min-h-dvh items-center justify-center bg-background px-4 py-10">{children}</main>;
}
