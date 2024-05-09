<script>
    import './styles.css';
    import Nav from '$lib/components/Nav.svelte';
    import {onNavigate} from '$app/navigation';
    import Footer from "$lib/components/Footer.svelte";

    onNavigate((navigation) => {
        if (!document.startViewTransition || navigation.to.url.pathname === navigation.from.url.pathname) return;

        return new Promise((resolve) => {
            const transition = document.startViewTransition(async () => {
                resolve();
                await navigation.complete;
            });

            transition.updateCallbackDone.then(() => {
            });

            transition.ready.then(() => {
            });

            transition.finished.then(() => {
            });
        });
    });
</script>
<Nav/>
<slot/>
<Footer></Footer>
