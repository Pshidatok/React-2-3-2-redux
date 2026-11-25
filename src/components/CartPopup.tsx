import {
  ActionIcon,
  Box,
  Button,
  Group,
  Image,
  Popover,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { IconShoppingCart, IconX } from "@tabler/icons-react";
import { formatPrice, getDisplayName } from "../lib/api";
import type { CartItem } from "../store/cartSlice";
import QuantityControl from "./QuantityControl";

type CartPopupProps = {
  items: CartItem[];
  onChangeQuantity: (id: number, value: number) => void;
  onRemove: (id: number) => void;
};

export default function CartPopup({
  items,
  onChangeQuantity,
  onRemove,
}: CartPopupProps) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Popover
      width={340}
      position="bottom-end"
      shadow="md"
      radius="sm"
      withArrow
    >
      <Popover.Target>
        <Button
          className="cart-button"
          color="leaf"
          size="xs"
          radius="sm"
          leftSection={
            <Text component="span" size="xs">
              Cart
            </Text>
          }
          rightSection={<IconShoppingCart size={14} />}
          aria-label="Open shopping cart"
        >
          {totalItems} · {formatPrice(total)}
        </Button>
      </Popover.Target>
      <Popover.Dropdown className="cart-popup" p="sm">
        <Text fw={700} size="sm" mb="sm">
          Cart
        </Text>
        {items.length === 0 ? (
          <Text size="sm" c="dimmed" py="md">
            Your cart is empty.
          </Text>
        ) : (
          <>
            <ScrollArea.Autosize mah={250}>
              <Stack gap="xs">
                {items.map(item => (
                  <Group key={item.id} wrap="nowrap" gap="xs">
                    <Image
                      src={item.image}
                      alt=""
                      w={40}
                      h={40}
                      radius="sm"
                      fit="cover"
                    />
                    <Box style={{ flex: 1 }}>
                      <Text size="xs" fw={600} truncate>
                        {getDisplayName(item.name)}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {formatPrice(item.price)} × {item.quantity}
                      </Text>
                    </Box>
                    <QuantityControl
                      value={item.quantity}
                      onChange={value => onChangeQuantity(item.id, value)}
                    />
                    <ActionIcon
                      aria-label={`Remove ${getDisplayName(item.name)}`}
                      variant="subtle"
                      color="gray"
                      size="sm"
                      onClick={() => onRemove(item.id)}
                    >
                      <IconX size={13} />
                    </ActionIcon>
                  </Group>
                ))}
              </Stack>
            </ScrollArea.Autosize>
            <Group
              justify="space-between"
              mt="sm"
              pt="sm"
              className="cart-total"
            >
              <Text size="sm" fw={600}>
                Total
              </Text>
              <Text size="sm" fw={700}>
                {formatPrice(total)}
              </Text>
            </Group>
          </>
        )}
      </Popover.Dropdown>
    </Popover>
  );
}
