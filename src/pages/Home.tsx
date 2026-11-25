import {
  Badge,
  Box,
  Center,
  Container,
  Group,
  Loader,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useMemo } from "react";
import CartPopup from "../components/CartPopup";
import ProductCard from "../components/ProductCard";
import {
  addToCart,
  changeCartQuantity,
  changeProductQuantity,
  removeFromCart,
  type CartItem,
} from "../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProducts } from "../store/productsSlice";
import "./home.css";

export default function Home() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products.items);
  const status = useAppSelector(state => state.products.status);
  const error = useAppSelector(state => state.products.error);
  const quantities = useAppSelector(state => state.cart.quantities);
  const cart = useAppSelector(state => state.cart.items);

  // Пока запрос не завершился (в том числе до первого dispatch) показываем загрузку.
  const loading = status === "idle" || status === "loading";

  useEffect(() => {
    const request = dispatch(fetchProducts());
    return () => request.abort();
  }, [dispatch]);

  const cartItems = useMemo<CartItem[]>(() => Object.values(cart), [cart]);

  return (
    <Box className="catalog-app">
      <Box component="header" className="site-header">
        <Container className="header-container">
          <Group gap={5}>
            <Text className="site-name" fw={700}>
              Vegetable
            </Text>
            <Badge
              className="shop-badge"
              color="leaf"
              variant="filled"
              size="xs"
              radius="sm"
            >
              SHOP
            </Badge>
          </Group>
          <CartPopup
            items={cartItems}
            onChangeQuantity={(id, value) =>
              dispatch(changeCartQuantity({ id, value }))
            }
            onRemove={id => dispatch(removeFromCart(id))}
          />
        </Container>
      </Box>
      <main>
        <Container className="catalog-container">
          <Title order={1} className="catalog-title">
            Catalog
          </Title>
          {loading && (
            <Center className="loading-state">
              <Stack align="center" gap="xs">
                <Loader color="leaf" size="sm" />
                <Text size="sm" c="dimmed">
                  Loading products...
                </Text>
              </Stack>
            </Center>
          )}
          {!loading && error && (
            <Paper p="lg" radius="md">
              <Text size="sm">{error}</Text>
            </Paper>
          )}
          {!loading && !error && (
            <SimpleGrid
              className="products-grid"
              cols={{ base: 2, sm: 3, md: 4 }}
              spacing="sm"
            >
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={quantities[product.id] ?? 1}
                  onQuantityChange={value =>
                    dispatch(changeProductQuantity({ id: product.id, value }))
                  }
                  onAdd={() => dispatch(addToCart(product))}
                />
              ))}
            </SimpleGrid>
          )}
        </Container>
      </main>
    </Box>
  );
}
