from django.contrib import admin

from .models import (
    Coupon,
    Item,
    ItemVariation,
    Order,
    OrderItem,
    Variation,
    UserProfile,
)

admin.site.register(Item)
admin.site.register(Variation)
admin.site.register(ItemVariation)
admin.site.register(OrderItem)
admin.site.register(Order)
admin.site.register(UserProfile)
admin.site.register(Coupon)
