## Data model
| Field | Type | Notes |
| --- | --- | --- |
| destinație | text | required, max 100 chars |
| plătită | boolean | toggled from the list, default false |
| tip_masă | fixed values | All Inclusive, Demipensiune, Mic dejun |
| categorie | relation | Munte, Litoral, City Break |
| utilizator | relation | the owner of the item (from week 11) |

Sample data used across all stages:
1. Ritz Paris, plătită, Mic dejun
2. Chalet Zermatt, neplătită, Demipensiune
3. Maldives Resort, plătită, All Inclusive