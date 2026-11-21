/**
 * Meitu VIP & Filter Unlock Script (Optimized)
 * Supports: Meitu (美图秀秀)
 */

const url = $request.url;

if (typeof $response === "undefined") {
    $done({});
} else {
    let body = $response.body;
    if (body) {
        try {
            let obj = JSON.parse(body);
            const FAR_FUTURE_TS = 4070908800; // 2099-01-01
            const FAR_FUTURE_STR = "2099-12-31 23:59:59";

            obj.code = 0;
            obj.message = "success";
            obj.error_code = "00000";
            obj.success = true;

            // 1. User Info & Profile VIP (api.xiuxiu.meitu.com/v1/user/show.json)
            if (url.includes("/user/") || url.includes("/show.json")) {
                obj.data = obj.data || {};
                obj.data.is_vip = 1;
                obj.data.vip_type = 1;
                obj.data.vip_status = 1;
                obj.data.status = 1;
                obj.data.vip_expire = FAR_FUTURE_STR;
                obj.data.expire_time = FAR_FUTURE_TS;
                obj.data.valid_time = FAR_FUTURE_TS;
                obj.data.vip_end_time = FAR_FUTURE_STR;
                obj.data.is_expire = false;
                obj.data.in_trial_period = false;
                obj.data.is_valid = true;
                obj.data.have_permission = true;
                obj.data.auto_sub = true;
                obj.data.vip_days = 99999;
                obj.data.rights = [
                    "all", "vip", "svip", "pink_diamond", "filter", "template", 
                    "cutout", "makeup", "hd", "beauty", "hair", "skin", 
                    "erase", "ai_cutout", "portrait_enhance", "super_resolution"
                ];
            }

            // 2. VIP Info & Group VIP (api-sub.meitu.com/v2/user/vip_info)
            if (url.includes("/vip_info") || url.includes("/vip_info_by_group") || url.includes("/vip/")) {
                obj.data = obj.data || {};
                obj.data.is_vip = 1;
                obj.data.vip_type = 1;
                obj.data.vip_status = 1;
                obj.data.status = 1;
                obj.data.expire_time = FAR_FUTURE_TS;
                obj.data.valid_time = FAR_FUTURE_TS;
                obj.data.vip_end_time = FAR_FUTURE_STR;
                obj.data.is_valid = true;
                obj.data.have_permission = true;
                obj.data.is_expire = false;
                obj.data.rights = [
                    "all", "vip", "svip", "filter", "template", "beauty", 
                    "hair", "skin", "makeup", "erase", "hd", "ai_cutout",
                    "portrait_enhance", "super_resolution"
                ];
            }

            // 3. Contract VIP (Hợp đồng thuê bao VIP đang có hiệu lực)
            if (url.includes("/contract/sub/get_valid_contract")) {
                obj.data = [{
                    contract_status: 1,
                    is_valid: true,
                    period_type: 1,
                    status: 1,
                    product_id: "com.meitu.xiuxiu.vip.year",
                    expire_time: FAR_FUTURE_TS
                }];
            }

            // 4. Permission & Rights Check (Quyền dùng tính năng & tải Filter)
            if (url.includes("/permission_check") || url.includes("/login_vip_check")) {
                obj.data = obj.data || {};
                obj.data.has_permission = true;
                obj.data.have_permission = true;
                obj.data.is_vip = 1;
                obj.data.status = 1;
            }

            // 5. Quota Check & Free Trial Strategy (Luôn có 999 lượt)
            if (url.includes("/function/user/check") || url.includes("/function/strategy/free") || url.includes("/products_by_function")) {
                obj.data = obj.data || {};
                obj.data.is_free = true;
                obj.data.free_count = 999;
                obj.data.right_count = 999;
                obj.data.consume_count = 0;
                obj.data.limit_val = 999;
                obj.data.have_permission = true;
                if (Array.isArray(obj.data.function_list)) {
                    obj.data.function_list.forEach(item => {
                        item.is_free = true;
                        item.free_count = 999;
                        item.right_count = 999;
                        item.consume_count = 0;
                        item.limit_val = 999;
                    });
                }
            }

            // 6. Material & Filter Package Permission Check
            if (url.includes("/material/") || url.includes("/h5/vip")) {
                obj.data = obj.data || {};
                obj.data.is_vip = 1;
                obj.data.vip_type = 1;
                obj.data.have_permission = true;
                obj.data.is_free = true;
            }

            // 7. Meidou / Coin Balance (Số dư hạt đậu ảo)
            if (url.includes("/account/balance")) {
                obj.data = {
                    balance: 99999,
                    gift_balance: 99999,
                    paid_balance: 99999,
                    total_balance: 99999
                };
            }

            $done({ body: JSON.stringify(obj) });
        } catch (e) {
            $done({});
        }
    } else {
        $done({});
    }
}
