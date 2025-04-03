import React from "react";
import RightNav from "../components/layout-component/RightNav";
import { Link, useLoaderData } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const NewsDetails = () => {
  const data = useLoaderData();
  const news = data.data[0];
  return (
    <div>
      <header>
        <Header></Header>
        <Navbar></Navbar>
      </header>
      <main className="w-11/12 mx-auto grid grid-cols-12 gap-5">
        <section className="col-span-9">
          <h1 className="font-semibold mb-2">Dragon News</h1>
          <div className="card bg-base-100 shadow-sm">
            <figure className="px-10 pt-10">
              <img
                src={news.image_url}
                alt="cover image"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{news.title}</h2>
              <p>{news.details}</p>
              <div className="card-actions items-start">
                <Link
                  to={`/category/${news?.category_id}`}
                  className="btn btn-neutral"
                >
                  Back to category
                </Link>
              </div>
            </div>
          </div>
        </section>
        <aside className="col-span-3">
          <RightNav></RightNav>
        </aside>
      </main>
    </div>
  );
};

export default NewsDetails;
