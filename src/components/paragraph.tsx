interface ParagraphProps {
  children: React.ReactNode;
}

function Paragraph(props: ParagraphProps) {
  return <p className="text-accent-foreground">{props.children}</p>;
}

export default Paragraph;
