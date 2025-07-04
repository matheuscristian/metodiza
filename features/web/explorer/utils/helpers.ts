import Swal from "sweetalert2";

export const constants = {
    dragType: "ENTRY",
};

export async function swalGetValue(title: string) {
    return await Swal.fire<string>({
        title: title,
        input: "text",
        inputPlaceholder: "Ding, ding, dong...",
        showCancelButton: true,
        inputValidator(value) {
            if (!value) {
                return "O campo é obrigatório!";
            }
        },
    });
}
