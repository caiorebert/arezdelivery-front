export let metadata = {
  title: 'ArezDelivery',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}
