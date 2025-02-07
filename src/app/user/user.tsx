'use client';

import Text from '@/components/shared/text/text';

const UserPageComponent = () => {
  return (
    <section className="section border-solid border-[var(--accent)] border">
      <div className="flex flex-col gap-4 py-5">
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
        <Text
          type="extraSmall"
          as="span"
          className="text-[var(--accent-background)]"
        >
          Extra small text in a span
        </Text>
      </div>
    </section>
  );
};

export default UserPageComponent;
