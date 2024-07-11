

const LayoutLandingPage = ({
    children
} : {
    children: React.ReactNode
}) => {
  return (
    <main className="h-full bg-[#0C0A00] overflow-auto">
        <div className="mx-auto max-w-screen-xl h-full">
            { children }
        </div>
    </main>
  )
}

export default LayoutLandingPage;