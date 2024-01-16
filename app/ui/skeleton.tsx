export function ConnectSkeleton() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex-col mx-auto">
        <div>
          <span className="h-20 w-20 loading loading-ring"></span>
        </div>
        <div>Menunggu...</div>
      </div>
    </div>
  );
}
