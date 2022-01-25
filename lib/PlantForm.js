export default function PlantForm() {
    const handleSubmit = async (event)=> {
        event.preventDefault();

        const form = new FormData(event.target);
        const formData = Object.fromEntries(form.entries());
        formData['calories'] = +formData['calories'];

        let res = await fetch('/api/plants', {
            body: JSON.stringify(formData),
            headers: {
                'Content-type': 'application/json',
            },
            method: 'POST',
        });
        let resData = await res.json();
        console.log(resData);
    };

    return (
        <form onSubmit={handleSubmit}>
            Name:
            <input name="name" type="text"></input>
            Calories:
            <input name="calories" type="number"></input>
            Vitamins:
            <input name="vitamins" type="text"></input>
            <button type="submit">Add</button>
        </form>
    );
}
