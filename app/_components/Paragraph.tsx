
type ParagraphProps = {
  children: React.ReactNode
}
export const Paragraph = ({children}:ParagraphProps) => {
  return (
    <p className='text-justify text-base sm:text-lg'>
      {children}
    </p>
  )
}
