import { Box, Button, Card, Group, Image, Stack, Text } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import { formatPrice, getDisplayName, type Product } from "../lib/api";
import QuantityControl from "./QuantityControl";

type ProductCardProps = {
  product: Product;
  quantity: number;
  onQuantityChange: (value: number) => void;
  onAdd: () => void;
};

export default function ProductCard({
  product,
  quantity,
  onQuantityChange,
  onAdd,
}: ProductCardProps) {
  return (
    <Card className="product-card" padding={0} radius="md">
      <Box className="product-image-box">
        <Image
          src={product.image}
          alt={getDisplayName(product.name)}
          className="product-image"
          fallbackSrc="https://placehold.co/220x150/f7f7ff/777?text=Fresh"
        />
      </Box>
      <Stack className="product-content" gap={5}>
        <Group justify="space-between" align="center" gap={4} wrap="nowrap">
          <Text className="product-title" fw={600} truncate>
            {getDisplayName(product.name)}
          </Text>
          <Text className="unit" c="dimmed">
            1 kg
          </Text>
          <QuantityControl value={quantity} onChange={onQuantityChange} />
        </Group>
        <Group justify="space-between" align="center" gap={6} wrap="nowrap">
          <Text className="product-price" fw={700}>
            {formatPrice(product.price)}
          </Text>
          <Button
            className="add-button"
            color="leaf"
            size="xs"
            radius="sm"
            onClick={onAdd}
            rightSection={<IconShoppingCart size={12} />}
          >
            Add to cart
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
