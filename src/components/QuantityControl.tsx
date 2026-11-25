import { ActionIcon, Group } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";

type QuantityControlProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function QuantityControl({
  value,
  onChange,
}: QuantityControlProps) {
  return (
    <Group className="quantity-control" gap={0} wrap="nowrap">
      <ActionIcon
        aria-label="Decrease quantity"
        variant="subtle"
        color="gray"
        size={20}
        onClick={() => onChange(Math.max(1, value - 1))}
      >
        <IconMinus size={11} stroke={2.5} />
      </ActionIcon>
      <input
        aria-label="Quantity"
        className="quantity-input"
        type="number"
        min={1}
        value={value}
        onChange={event =>
          onChange(Math.max(1, Number(event.target.value) || 1))
        }
      />
      <ActionIcon
        aria-label="Increase quantity"
        variant="subtle"
        color="gray"
        size={20}
        onClick={() => onChange(value + 1)}
      >
        <IconPlus size={11} stroke={2.5} />
      </ActionIcon>
    </Group>
  );
}
