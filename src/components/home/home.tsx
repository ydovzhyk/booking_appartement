import Text from '../shared/text/text';

export default function HomeComponent() {
  return (
    <div className="container">
      <div className="section border-solid border-violet-600 border-2">
        <div className="p-6">
          <Text type="title" as="h1">
            Main Heading (H1)
          </Text>
          <Text type="normal" as="h2">
            Subheading (H2)
          </Text>
          <Text type="normal" as="p">
            This is normal text
          </Text>
          <Text type="small" as="span" className="text-red-500">
            Small text in a span
          </Text>
        </div>
      </div>
    </div>
  );
}
