# User

- id
- firstName
- lastName
- email\*
- phone\*
- role\*
- createdAt
- updatedAt
- deletedAt (-)

# Customer

- id
- firstName\*
- lastName\*
- email\*
- password\*
- phone\*
- image
- note (-)
- createdAt
- updatedAt
- deletedAt (-)

# CustomerAddress

- id
- customerId\*
- address1\*
- address2
- city\*
- country\*
- company
- zip\*
- phone (-)
- apartment\*
- createdAt
- updatedAt
- deletedAt (-)

# Category

- id
- title\*
- image
- description
- slug
- createdAt
- updatedAt
- deletedAt (-)

# Product

- id
- title\*
- description
- ProductImages[]
- slug
- options[]
- createdAt
- updatedAt
- variants[]
- compareAtPrice
- rate
- vendor
- quantity\*
- status (active | draft) (-)
- deletedAt (-)
- totalReviews (-)

# ProductOptions

- id
- productId\*
- name\*
- values[]\*

# ProductVariants

- id
- productId\*
- barcode
- weight
- price\*
- sku\*

# ProductImages

- id
- src\*
- productId\*

# ProductReview

- id
- productId\*
- customerId\*
- rate\*
- review\*
- createdAt\*
- updatedAt
- deletedAt (-)

# Cart

- id\*
- customerId\*
- cartItems[]
- createdAt
- updatedAt
- currentTotalDiscounts\*
- currentTotalPrice\*

# CartItem

- id
- cartId\*
- productId\*
- productImage
- productTitle\*
- quantity\*
- productCompareAtPrice

# Order

- id\*
- customerId\*
- email\*
- OrderShippingAddress[]\*
- createdAt
- cancelReason
- cancelledAt
- closedAt
- currentTotalDiscounts\*
- currentTotalPrice\*
- orderItems[]
- status (open | shipped | closed | rejected)
- note (-)
- customerNote (-)

# OrderShippingAddress

- id
- orderId\*
- address\*
- city\*
- country\*
- company
- firstName\*
- lastName\*
- phone\*
- zip

# OrderItem

- id
- orderId\*
- productId\*
- productImage
- productTitle\*
- quantity\*
- productPrice\*
- productBarcode (-)
- product SKU (-)
- productCompareAtPrice (-)
