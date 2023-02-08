from django.contrib import admin

from .models import Item, ItemVariation, Order, OrderItem, Variation

admin.site.register(Item)
admin.site.register(Variation)
admin.site.register(ItemVariation)
admin.site.register(OrderItem)
admin.site.register(Order)
